import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphqlCronService } from './graphql-cron.service';
import { GraphqlCron } from './entities/graphql-cron.entity';
import { CreateGraphqlCronInput } from './dto/create-graphql-cron.input';
import { UpdateGraphqlCronInput } from './dto/update-graphql-cron.input';

@Resolver(() => GraphqlCron)
export class GraphqlCronResolver {
  constructor(private readonly graphqlCronService: GraphqlCronService) {}

  @Mutation(() => GraphqlCron)
  createGraphqlCron(@Args('createGraphqlCronInput') createGraphqlCronInput: CreateGraphqlCronInput) {
    return this.graphqlCronService.create(createGraphqlCronInput);
  }

  @Query(() => [GraphqlCron], { name: 'graphqlCron' })
  findAll() {
    return this.graphqlCronService.findAll();
  }

  @Query(() => GraphqlCron, { name: 'graphqlCron' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlCronService.findOne(id);
  }

  @Mutation(() => GraphqlCron)
  updateGraphqlCron(@Args('updateGraphqlCronInput') updateGraphqlCronInput: UpdateGraphqlCronInput) {
    return this.graphqlCronService.update(updateGraphqlCronInput.id, updateGraphqlCronInput);
  }

  @Mutation(() => GraphqlCron)
  removeGraphqlCron(@Args('id', { type: () => Int }) id: number) {
    return this.graphqlCronService.remove(id);
  }
}
