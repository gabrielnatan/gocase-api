import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetActiveCampaignsUseCase implements IUseCase<void, GetActiveCampaignsOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(): Promise<GetActiveCampaignsOutput> {
        const campaigns = await this.campaignRepo.findActiveCampaigns();
        return campaigns.map(CampaignOutputMapper.toOutput);
    }
}

type GetActiveCampaignsOutput = CampaignOutput[];
