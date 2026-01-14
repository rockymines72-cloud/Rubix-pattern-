
import { Pattern } from './types';

export const PATTERNS: Pattern[] = [
  {
    id: '3x3-checker',
    name: 'Checkerboard',
    size: '3x3',
    algorithm: "M2 E2 S2",
    description: "The classic checkerboard pattern. Every face looks like a grid of alternating colors.",
    difficulty: 'Easy',
    tags: ['classic', 'symmetrical']
  },
  {
    id: '3x3-donut',
    name: 'Donut (Dots)',
    size: '3x3',
    algorithm: "E M E' M'",
    description: "The center piece of each face is swapped with its opposite color.",
    difficulty: 'Easy',
    tags: ['classic', 'minimalist']
  },
  {
    id: '3x3-cube-in-cube',
    name: 'Cube in a Cube',
    size: '3x3',
    algorithm: "F L F U' R U F2 L2 U' L' B D' B' L2 U",
    description: "Makes it look like a smaller 2x2 cube is nested inside the 3x3.",
    difficulty: 'Medium',
    tags: ['optical illusion']
  },
  {
    id: '3x3-superflip',
    name: 'Superflip',
    size: '3x3',
    algorithm: "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
    description: "Every single edge piece is flipped in place. The hardest pattern to execute manually.",
    difficulty: 'Hard',
    tags: ['symmetrical', 'legendary']
  },
  {
    id: '3x3-python',
    name: 'Python',
    size: '3x3',
    algorithm: "F2 R' B' U R' L F' L F' B D' R B L2",
    description: "A snake-like pattern winding around the cube faces.",
    difficulty: 'Medium',
    tags: ['winding']
  },
  {
    id: '2x2-checker',
    name: '2x2 Checkerboard',
    size: '2x2',
    algorithm: "R2 U2 R2 U2",
    description: "A simple checkerboard for the 2x2 pocket cube.",
    difficulty: 'Easy',
    tags: ['mini']
  },
  {
    id: '4x4-checker',
    name: '4x4 Checkerboard',
    size: '4x4',
    algorithm: "Rw2 Lw2 Uw2 Dw2 Fw2 Bw2",
    description: "The grand checkerboard for the Revenge cube.",
    difficulty: 'Easy',
    tags: ['big cube']
  },
  {
    id: '4x4-cube-in-cube',
    name: 'Small Cube in Big Cube',
    size: '4x4',
    algorithm: "Fw Lw Fw Uw' Rw Uw Fw2 Lw2 Uw' Lw' Bw Dw' Bw' Lw2 Uw",
    description: "A nested effect specifically scaled for the 4x4.",
    difficulty: 'Medium',
    tags: ['optical illusion']
  },
  {
    id: '5x5-checker',
    name: '5x5 Triple Checker',
    size: '5x5',
    algorithm: "r2 l2 U2 D2 f2 b2",
    description: "Creates multiple layers of checkerboard patterns on the Professor's cube.",
    difficulty: 'Medium',
    tags: ['complex']
  },
  {
    id: '5x5-donut-plus',
    name: 'Donut Plus',
    size: '5x5',
    algorithm: "E M E' M' (Repeat with different layers)",
    description: "Swaps multiple center circles on the 5x5 cube.",
    difficulty: 'Hard',
    tags: ['complex', 'centers']
  }
];

export const NOTATIONS = [
  { move: 'R', desc: 'Right face clockwise' },
  { move: 'L', desc: 'Left face clockwise' },
  { move: 'U', desc: 'Up face clockwise' },
  { move: 'D', desc: 'Down face clockwise' },
  { move: 'F', desc: 'Front face clockwise' },
  { move: 'B', desc: 'Back face clockwise' },
  { move: "R'", desc: 'Right face counter-clockwise' },
  { move: 'R2', desc: 'Right face 180 degrees' },
  { move: 'Rw', desc: 'Right wide (2 layers at once)' },
  { move: 'M', desc: 'Middle layer (between R and L)' },
];
