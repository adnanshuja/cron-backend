import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Cron } from "src/cron/entities/cron.entity";
import { Permission } from "src/permission/permission.entity";
import { User, UserRole } from "src/user/user.entity";

export enum ACTIONS {
    MANAGE= 'manage', 
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
}

export type Subjects = InferSubjects<typeof User | typeof Cron | 'all'>;
export type AppAbility = Ability<[ACTIONS, Subjects]>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User){
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        // if(user.role === UserRole.ADMIN){
        //     can(ACTIONS.MANAGE, 'all');
        // } else {
        //     can(ACTIONS.READ, User);
        // }
        return build({ detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>})
    }
}
