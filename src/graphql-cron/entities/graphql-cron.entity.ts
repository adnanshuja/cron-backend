import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GraphqlCron {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
