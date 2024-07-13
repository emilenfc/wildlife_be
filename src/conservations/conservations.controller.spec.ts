import { Test, TestingModule } from '@nestjs/testing';
import { ConservationsController } from './conservations.controller';
import { ConservationsService } from './conservations.service';

describe('ConservationsController', () => {
  let controller: ConservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConservationsController],
      providers: [ConservationsService]
    }).compile();

    controller = module.get<ConservationsController>(ConservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
