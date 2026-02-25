import { describe, it, expect } from 'vitest';
import { SlashCommandExtension } from '../extensions/SlashCommandExtension';

describe('SlashCommandExtension Module', () => {
  it('exports SlashCommandExtension', () => {
    expect(SlashCommandExtension).toBeDefined();
  });

  it('extension has name property', () => {
    expect(SlashCommandExtension.name).toBe('slashCommand');
  });
});
