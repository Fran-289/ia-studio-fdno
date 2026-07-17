import { formatBytes, truncate } from './utils';

describe('formatBytes', () => {
  it('should return 0 Bytes for 0', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });

  it('should format bytes correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(1073741824)).toBe('1 GB');
  });

  it('should respect decimal places', () => {
    expect(formatBytes(1536, 1)).toBe('1.5 KB');
  });
});

describe('truncate', () => {
  it('should return original string if shorter than limit', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('should truncate and add ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('');
  });
});
