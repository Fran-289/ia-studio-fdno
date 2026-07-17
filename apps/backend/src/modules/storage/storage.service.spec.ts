import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';
import * as fs from 'fs';
import * as path from 'path';

describe('StorageService', () => {
  let service: StorageService;
  let existsSyncMock: jest.SpyInstance;
  let mkdirSyncMock: jest.SpyInstance;
  let writeFileSyncMock: jest.SpyInstance;
  let readdirSyncMock: jest.SpyInstance;
  let statSyncMock: jest.SpyInstance;
  let unlinkSyncMock: jest.SpyInstance;

  beforeEach(async () => {
    existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    mkdirSyncMock = jest.spyOn(fs, 'mkdirSync').mockReturnValue(undefined);
    writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockReturnValue(undefined);
    readdirSyncMock = jest.spyOn(fs, 'readdirSync').mockImplementation(() => []);
    statSyncMock = jest.spyOn(fs, 'statSync').mockReturnValue({
      size: 100,
      birthtime: new Date('2024-01-01'),
      isFile: () => true,
    } as any);
    unlinkSyncMock = jest.spyOn(fs, 'unlinkSync').mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('upload', () => {
    it('should save file and return url', async () => {
      const file = {
        originalname: 'test.png',
        buffer: Buffer.from('test'),
        size: 4,
        mimetype: 'image/png',
      } as Express.Multer.File;

      const result = await service.upload(file, 'user-1');

      expect(result.success).toBe(true);
      expect(result.data?.url).toContain('test.png');
      expect(writeFileSyncMock).toHaveBeenCalled();
    });

    it('should handle file write error', async () => {
      writeFileSyncMock.mockImplementation(() => { throw new Error('Disk full'); });

      const file = {
        originalname: 'test.png',
        buffer: Buffer.from('test'),
        size: 4,
        mimetype: 'image/png',
      } as Express.Multer.File;

      const result = await service.upload(file, 'user-1');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Disk full');
    });
  });

  describe('list', () => {
    it('should return file list', async () => {
      readdirSyncMock.mockReturnValue(['file1.png', 'file2.jpg']);
      statSyncMock.mockReturnValue({
        size: 100,
        birthtime: new Date('2024-01-01'),
        isFile: () => true,
      } as any);

      const result = await service.list('user-1');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.[0].url).toContain('file1.png');
    });

    it('should handle read error', async () => {
      readdirSyncMock.mockImplementation(() => { throw new Error('Permission denied'); });

      const result = await service.list('user-1');
      expect(result.success).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete existing file', async () => {
      const result = await service.delete('/uploads/user-1/test.png');
      expect(result.success).toBe(true);
      expect(unlinkSyncMock).toHaveBeenCalled();
    });

    it('should not fail if file does not exist', async () => {
      existsSyncMock.mockReturnValue(false);

      const result = await service.delete('/uploads/user-1/test.png');
      expect(result.success).toBe(true);
      expect(unlinkSyncMock).not.toHaveBeenCalled();
    });
  });
});
