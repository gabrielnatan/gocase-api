import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Campaign } from "../../../../../domain/campaign/entity/campaign.entity.js";
import { ICampaignRepository } from "../../../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignModelMapper } from "../mapper/campaign-model.mapper.js";
import { ICampaign, CampaignModel } from "../model/campaign.model.js";

export class CampaignRepository implements ICampaignRepository {

    constructor(private campaignModel = CampaignModel) {}

    async insert(entity: Campaign): Promise<void> {
        console.log("INSERT CAMPAIGN: ", entity);
        const campaign = CampaignModelMapper.toModel(entity);
        await this.campaignModel.create(campaign);
    }

    async delete(entityId: Uuid): Promise<void> {
        await this.campaignModel.updateOne(
            { id: entityId.id },  
            { deleted_at: new Date() }
        );
    }

    async update(entity: Campaign): Promise<void> {
        const modelProps = CampaignModelMapper.toModel(entity);

        await this.campaignModel.updateOne(
            { id: entity.id.id },
            { 
                name: modelProps.name,
                goal: modelProps.goal,
                products: modelProps.products,
                content_type: modelProps.content_type,
                hashtags: modelProps.hashtags,
                influencers: modelProps.influencers,
                dates: modelProps.dates,
                status: modelProps.status, 
                materials: modelProps.materials,
                created_at: modelProps.created_at,
                updated_at: new Date(),
                deleted_at: modelProps.deleted_at,
            }
        );
    }

    async findById(entityId: Uuid): Promise<Campaign | null> {
        const model = await this.campaignModel.findOne({ 
            id: entityId.toString(),
            deleted_at: null
        });
         
        return model ? CampaignModelMapper.toEntity(model) : null;
    }

    async findAll(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ deleted_at: null });
        return models.map((campaign: ICampaign) => CampaignModelMapper.toEntity(campaign));
    }

    async findByInfluencer(influencer: string): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ influencers: influencer, status: "active", deleted_at: null });
        return models.map((campaign: ICampaign) => CampaignModelMapper.toEntity(campaign));
    }

    async findActiveCampaigns(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ status: "active", deleted_at: null });
        return models.map(CampaignModelMapper.toEntity);
    }

    async findCompletedCampaigns(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ status: "completed", deleted_at: null });
        return models.map(CampaignModelMapper.toEntity);
    }

    async findPendingCampaigns(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ status: "pending", deleted_at: null });
        return models.map(CampaignModelMapper.toEntity);
    }

    async findCanceledCampaigns(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ status: "canceled", deleted_at: null });
        return models.map(CampaignModelMapper.toEntity);
    }

    async findArchivedCampaigns(): Promise<Campaign[]> {
        const models = await this.campaignModel.find({ status: "archived", deleted_at: null });
        return models.map(CampaignModelMapper.toEntity);
    }
}
