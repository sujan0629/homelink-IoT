import { Test, TestingModule } from '@nestjs/testing';
import { DoorGateway } from './door.gateway';

describe('DoorGateway', () => {
  let gateway: DoorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoorGateway],
    }).compile();

    gateway = module.get<DoorGateway>(DoorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});