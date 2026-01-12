import React from 'react';

const StarBorder = ({
    as: Component = "button",
    className = "",
    color = "cyan",
    speed = "4s",
    children,
    ...props
}) => {
    return (
        <Component
            className={`relative inline-block p-[1px] overflow-hidden rounded-[20px] transition-transform duration-300 hover:scale-105 ${className}`}
            {...props}
        >
            {/* 
        Spinning Gradient "Star" - Conic Gradient
        Centered and rotating. The gradient creates the "tail" effect.
      */}
            <div
                className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] z-0"
                style={{
                    background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 50%, ${color} 100%)`,
                    animationDuration: speed,
                }}
            />

            {/* Main Content Container - Opaque Background to mask the center */}
            <div className="relative z-1 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 text-white rounded-[20px] backdrop-blur-xl w-full h-full">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
