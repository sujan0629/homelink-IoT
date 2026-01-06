import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentGateway } from './environment.gateway';

describe('EnvironmentGateway', () => {
  let gateway: EnvironmentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentGateway],
    }).compile();

    gateway = module.get<EnvironmentGateway>(EnvironmentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
