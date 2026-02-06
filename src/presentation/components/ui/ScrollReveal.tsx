'use client';

import React, { useEffect, useRef, useState } from 'react';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'flip-down';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animations: Record<AnimationType, { initial: string; animate: string }> = {
  'fade-up': {
    initial: 'opacity-0 translate-y-10',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-down': {
    initial: 'opacity-0 -translate-y-10',
    animate: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    initial: 'opacity-0 translate-x-10',
    animate: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    initial: 'opacity-0 -translate-x-10',
    animate: 'opacity-100 translate-x-0',
  },
  'zoom-in': {
    initial: 'opacity-0 scale-90',
    animate: 'opacity-100 scale-100',
  },
  'zoom-out': {
    initial: 'opacity-0 scale-110',
    animate: 'opacity-100 scale-100',
  },
  'flip-up': {
    initial: 'opacity-0 rotateX-90',
    animate: 'opacity-100 rotateX-0',
  },
  'flip-down': {
    initial: 'opacity-0 -rotateX-90',
    animate: 'opacity-100 rotateX-0',
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const anim = animations[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ${className} ${isVisible ? anim.animate : anim.initial}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

// Stagger children animation
interface StaggerRevealProps {
  children: React.ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  childClassName?: string;
  once?: boolean;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  animation = 'fade-up',
  staggerDelay = 100,
  duration = 600,
  threshold = 0.1,
  className = '',
  childClassName = '',
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const anim = animations[animation];

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all ${childClassName} ${isVisible ? anim.animate : anim.initial}`}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollReveal;
