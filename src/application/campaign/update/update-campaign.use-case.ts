import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class UpdateCampaignUseCase implements IUseCase<UpdateCampaignInput, UpdateCampaignOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(input: UpdateCampaignInput): Promise<CampaignOutput> {
        const uuid = new Uuid(input.id);
        const campaign = await this.campaignRepo.findById(uuid);

        if (!campaign) {
            throw new Error("Campaign does not exist.");
        }

        if (input.name !== undefined) {
            campaign.changeName(input.name);
        }
        if (input.goal !== undefined) {
            campaign.changeGoal(input.goal);
        }
        if (input.products !== undefined) {
            campaign.changeProducts(input.products);
        }
        if (input.content_type !== undefined) {
            campaign.changeContentType(input.content_type);
        }
        if (input.hashtags !== undefined) {
            campaign.changeHashtags(input.hashtags);
        }
        if (input.influencers !== undefined) {
            campaign.changeInfluencers(input.influencers);
        }
        if (input.dates !== undefined) {
            campaign.changeDates(input.dates);
        }
        if (input.materials !== undefined) {
            campaign.changeMaterials(input.materials);
        }

        await this.campaignRepo.update(campaign);

        return CampaignOutputMapper.toOutput(campaign);
    }
}

export interface UpdateCampaignInput {
    id: string;
    name?: string;
    goal?: string;
    products?: string;
    content_type?: string;
    hashtags?: string[];
    influencers?: string[];
    dates?: {
        entrega: Date;
        publicacao: Date;
    };
    materials?: string[];
}

export type UpdateCampaignOutput = CampaignOutput;
