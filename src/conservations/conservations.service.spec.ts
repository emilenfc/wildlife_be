import { Test, TestingModule } from '@nestjs/testing';
import { ConservationsService } from './conservations.service';

describe('ConservationsService', () => {
  let service: ConservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConservationsService],
    }).compile();

    service = module.get<ConservationsService>(ConservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
