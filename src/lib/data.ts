import type { Resource, ResourceCategory } from '@/lib/types';

export const categories: ResourceCategory[] = [
  'Math',
  'Programming',
  'IT Fundamentals',
  'Discrete Structures',
  'Pateros History',
  'Pathfit',
  'Understanding the Self',
  'Komunikasyon',
  'Civil Welfare',
];

export const resources: Resource[] = [
  {
    id: 'prog-1',
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
    category: 'Programming',
    content: `JavaScript is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. Alongside HTML and CSS, JavaScript is one of the three core technologies of the World Wide Web. JavaScript enables interactive web pages and thus is an essential part of web applications. The vast majority of websites use it, and all major web browsers have a dedicated JavaScript engine to execute it. This course will cover variables, data types, functions, and control flow.`,
  },
  {
    id: 'math-1',
    title: 'Calculus I: Limits and Derivatives',
    description: 'An introduction to the core concepts of differential calculus.',
    category: 'Math',
    content: `Calculus is the mathematical study of continuous change. This introductory module focuses on limits, a fundamental concept that underpins all of calculus. We will explore how to find limits graphically and algebraically. Following that, we will define the derivative as the limit of the difference quotient, and learn rules for finding derivatives of polynomial, trigonometric, exponential, and logarithmic functions. Applications include optimization problems and related rates.`,
  },
  {
    id: 'itf-1',
    title: 'Computer Hardware Basics',
    description: 'Understand the components that make up a modern computer.',
    category: 'IT Fundamentals',
    content: `This document provides an overview of essential computer hardware. We will dissect a typical desktop computer to identify and understand the function of each part, including the Central Processing Unit (CPU), Random Access Memory (RAM), the motherboard, storage devices (SSD, HDD), the power supply unit (PSU), and graphics processing unit (GPU). Understanding these components is crucial for troubleshooting, upgrading, and building your own PC.`,
  },
  {
    id: 'prog-2',
    title: 'React for Beginners',
    description: 'Build your first dynamic web application with the React library.',
    category: 'Programming',
    content: `React is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. This guide will walk you through setting up a new React project, understanding components, props, state, and hooks like useState and useEffect. By the end, you will have built a simple to-do list application.`,
  },
  {
    id: 'ds-1',
    title: 'Introduction to Set Theory',
    description: 'Exploring the foundational concepts of sets, subsets, and operations.',
    category: 'Discrete Structures',
    content: `Set theory is the branch of mathematical logic that studies sets, which are informally described as collections of objects. Although any type of object can be collected into a set, set theory is applied most often to objects that are relevant to mathematics. This lesson covers basic definitions and notations, subsets, power sets, and operations on sets such as union, intersection, difference, and complement. Venn diagrams are used to visualize these operations.`,
  },
  {
    id: 'hist-1',
    title: 'The Foundation of Pateros',
    description: 'Discover the rich history of the Municipality of Pateros.',
    category: 'Pateros History',
    content: `The history of Pateros dates back to the pre-colonial era. The name "Pateros" is derived from the duck-raising industry. The Tagalog word for duck is "pato", and "pateros" refers to the duck-raisers. Pateros was founded as a pueblo in 1770 and is famous for its balut industry. This module explores its establishment, its role during the Philippine Revolution, and its development into the only remaining municipality in Metro Manila.`,
  },
];
