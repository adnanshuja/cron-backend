import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlCronService } from './graphql-cron.service';

describe('GraphqlCronService', () => {
  let service: GraphqlCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlCronService],
    }).compile();

    service = module.get<GraphqlCronService>(GraphqlCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
