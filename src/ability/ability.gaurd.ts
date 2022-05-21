import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, ACTIONS, Subjects } from './ability.factory';

@Injectable()
export class CheckAuthroizationGaurd implements CanActivate{
    constructor(
        private reflector : Reflector,
        private abilityFactory: AbilityFactory
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules = this.reflector.get<[ACTIONS, Subjects]>('check_ability', context.getHandler());
        return true;
    }
}