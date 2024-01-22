import { User } from './user.model';
import { Skin } from './skin.model';

export class Inventory {
    constructor(
        public id: string,
        public user: User["id"],
        public skin: Skin["id"]
    ) {}
}