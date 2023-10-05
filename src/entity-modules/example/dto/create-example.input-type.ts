import { InputType, OmitType } from '@nestjs/graphql';
import { omittedEntityMetaColumns } from '../../../common';
import { Example } from '../../../entities';

@InputType()
export class CreateExampleInputType extends OmitType(
    Example,
    ['id', ...omittedEntityMetaColumns],
    InputType
) {}
