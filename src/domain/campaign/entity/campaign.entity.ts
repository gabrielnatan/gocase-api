import { Entity } from "../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../@sahred/domain/value-object/value-object.js";

export type CampaignProps = {
    id?: Uuid;
    name: string;
    goal: string;
    products: string[];
    content_type: string;
    hashtags: string[];
    influencers: string[];
    dates: {
        entrega: Date;
        publicacao: Date;
    };
    status: 'active' | 'completed' | 'pending' | 'canceled' | 'archived';
    materials: string[];
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};

export class Campaign extends Entity {
    id: Uuid;
    name: string;
    goal: string;
    products: string[];
    content_type: string;
    hashtags: string[];
    influencers: string[];
    dates: {
        entrega: Date;
        publicacao: Date;
    };
    status: 'active' | 'completed' | 'pending' | 'canceled' | 'archived';
    materials: string[];
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor({
        id,
        name,
        goal,
        products,
        content_type,
        hashtags,
        influencers,
        dates,
        status,
        materials,
        created_at,
        updated_at,
        deleted_at,
    }: CampaignProps) {
        super();
        this.id = id ?? new Uuid();
        this.name = name;
        this.goal = goal;
        this.products = products;
        this.content_type = content_type;
        this.hashtags = hashtags;
        this.influencers = influencers;
        this.dates = dates;
        this.status = status ?? 'pending'; // Status padrão
        this.materials = materials;
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    /** 🏷️ Métodos para atualização individual dos campos */
    changeName(name: string) {
        this.name = name;
        this.updated_at = new Date();
    }

    changeGoal(goal: string) {
        this.goal = goal;
        this.updated_at = new Date();
    }

    changeProducts(products: string[]) {
        this.products = products;
        this.updated_at = new Date();
    }

    changeContentType(content_type: string) {
        this.content_type = content_type;
        this.updated_at = new Date();
    }

    changeHashtags(hashtags: string[]) {
        this.hashtags = hashtags;
        this.updated_at = new Date();
    }

    changeInfluencers(influencers: string[]) {
        this.influencers = influencers;
        this.updated_at = new Date();
    }

    changeDates(dates: { entrega: Date; publicacao: Date }) {
        this.dates = dates;
        this.updated_at = new Date();
    }

    changeMaterials(materials: string[]) {
        this.materials = materials;
        this.updated_at = new Date();
    }

    changeStatus(status: 'active' | 'completed' | 'pending' | 'canceled' | 'archived') {
        this.status = status;
        this.updated_at = new Date();
    }

    static create(props: CampaignProps) {
        return new Campaign(props);
    }

    get entity_id(): ValueObject {
        return this.id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            products: this.products,
            content_type: this.content_type,
            hashtags: this.hashtags,
            influencers: this.influencers,
            dates: this.dates,
            status: this.status,
            materials: this.materials,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
