import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Campaign } from "../../../../../domain/campaign/entity/campaign.entity.js";
import { ICampaign, CampaignModel } from "../model/campaign.model.js";

export class CampaignModelMapper {
    static toModel(entity: Campaign): ICampaign {
        return new CampaignModel({
            id: entity.id.id, 
            name: entity.name,
            goal: entity.goal,
            products: entity.products,
            content_type: entity.content_type,
            hashtags: entity.hashtags,
            influencers: entity.influencers,
            dates: {
                entrega: entity.dates.entrega,
                publicacao: entity.dates.publicacao,
            },
            status: entity.status, 
            materials: entity.materials,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        });
    }

    static toEntity(model: ICampaign): Campaign {
        return new Campaign({
            id: new Uuid(model.id),
            name: model.name,
            goal: model.goal,
            products: model.products,
            content_type: model.content_type,
            hashtags: model.hashtags,
            influencers: model.influencers,
            dates: {
                entrega: model.dates.entrega,
                publicacao: model.dates.publicacao,
            },
            status: model.status as 'active' | 'completed' | 'pending' | 'canceled' | 'archived', 
            materials: model.materials,
            created_at: model.created_at,
            updated_at: model.updated_at,
            deleted_at: model.deleted_at,
        });
    }
}
