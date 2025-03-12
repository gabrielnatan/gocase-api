import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetPendingCampaignsUseCase implements IUseCase<void, GetPendingCampaignsOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(): Promise<GetPendingCampaignsOutput> {
        const campaigns = await this.campaignRepo.findPendingCampaigns();
        return campaigns.map(CampaignOutputMapper.toOutput);
    }
}

type GetPendingCampaignsOutput = CampaignOutput[];
