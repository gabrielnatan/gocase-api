import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class ListCampaignUseCase implements IUseCase<ListCampaignInput, ListCampaignOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(input: ListCampaignInput): Promise<ListCampaignOutput> {
        const campaigns = await this.campaignRepo.findAll(new Uuid(input.user_id));
        return campaigns ? campaigns.map(CampaignOutputMapper.toOutput): [];
    }
}

export interface ListCampaignInput {
    user_id: string
}

export type ListCampaignOutput = CampaignOutput[];
