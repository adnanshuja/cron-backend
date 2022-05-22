import { CreateGraphqlCronInput } from './create-graphql-cron.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGraphqlCronInput extends PartialType(CreateGraphqlCronInput) {
  @Field(() => Int)
  id: number;
}
