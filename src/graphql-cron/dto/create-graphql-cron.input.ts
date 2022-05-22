import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGraphqlCronInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
