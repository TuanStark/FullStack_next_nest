import { SignInInput } from './signin.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(SignInInput) {
  @Field(() => Int)
  id: number;
}
