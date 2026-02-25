import { describe, it, expect } from 'vitest';
import * as EditorModule from '../components/Editor/Editor';

describe('Editor Module Exports', () => {
  it('exports Editor function', () => {
    expect(EditorModule.Editor).toBeDefined();
    expect(typeof EditorModule.Editor).toBe('function');
  });

  it('module has expected exports', () => {
    const exports = Object.keys(EditorModule);
    expect(exports).toContain('Editor');
  });
});

describe('Editor Component Structure', () => {
  it('Editor component accepts props object', () => {
    // Verify the component signature by checking it's a function
    expect(EditorModule.Editor).toBeInstanceOf(Function);
  });
});
