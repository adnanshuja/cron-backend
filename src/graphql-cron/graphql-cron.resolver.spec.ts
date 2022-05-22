import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlCronResolver } from './graphql-cron.resolver';
import { GraphqlCronService } from './graphql-cron.service';

describe('GraphqlCronResolver', () => {
  let resolver: GraphqlCronResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlCronResolver, GraphqlCronService],
    }).compile();

    resolver = module.get<GraphqlCronResolver>(GraphqlCronResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
