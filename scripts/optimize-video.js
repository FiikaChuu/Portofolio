
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

// FIX: ffmpeg-static returns a path string, we need to handle potential spaces or issues? 
// Actually, ffmpeg-static usually works directly.
// But let's verify if we need to quote it (fluent-ffmpeg handles it).
// Let's console log the path to be sure.
console.log("Using FFmpeg executable at:", ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath);

const optimizeVideos = async () => {
    // Find all MP4 videos
    const videos = await glob('src/assets/**/*.mp4', { ignore: 'node_modules/**' });

    console.log(`Found ${videos.length} videos to optimize...`);

    let savedBytes = 0;

    for (const file of videos) {
        try {
            const tempFile = file.replace('.mp4', '_temp.mp4');
            const statsBefore = await fs.stat(file);

            console.log(`Optimizing: ${path.basename(file)} (${(statsBefore.size / 1024 / 1024).toFixed(2)} MB)...`);

            await new Promise((resolve, reject) => {
                ffmpeg(file)
                    .videoCodec('libx264')
                    .size('?x720')
                    .videoBitrate('1000k')
                    .outputOptions([
                        '-preset slow',
                        '-crf 28',
                        '-movflags +faststart',
                        '-an' // MUTE AUDIO explicitly if not needed (for background videos), or keep it.
                        // For portfolio previews, audio might not be needed? Let's keep audio for now but lightweight.
                    ])
                    // Re-add audio if needed, but 'an' removes it for max savings. 
                    // Let's assume user wants audio unless specified. 
                    // Actually, for "brutal" optimization, removing audio is often key if it's just visual.
                    // But these seem to be "WhatsApp Video" which implies they might have sound?
                    // Let's try to keep audio but aggressive aac.
                    .audioCodec('aac')
                    .audioBitrate('64k') // 64k is enough for speech
                    .on('end', resolve)
                    .on('error', (err) => {
                        console.error('FFmpeg Error:', err);
                        reject(err);
                    })
                    .save(tempFile);
            });

            const statsAfter = await fs.stat(tempFile);
            const savings = statsBefore.size - statsAfter.size;

            if (savings > 0) {
                savedBytes += savings;
                console.log(` Optimized: ${(statsAfter.size / 1024 / 1024).toFixed(2)} MB (Saved ${(savings / 1024 / 1024).toFixed(2)} MB)`);

                // Replace original with optimized
                await fs.unlink(file);
                await fs.rename(tempFile, file);
            } else {
                console.log(` Skipped: Optimized version was larger. Keeping original.`);
                await fs.unlink(tempFile);
            }

        } catch (error) {
            console.error(`Error optimizing ${file}:`, error);
            try { await fs.unlink(file.replace('.mp4', '_temp.mp4')); } catch (e) { }
        }
    }

    console.log(`Total video space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
};

optimizeVideos();
