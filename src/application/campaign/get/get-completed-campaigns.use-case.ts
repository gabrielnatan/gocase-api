import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetCompletedCampaignsUseCase implements IUseCase<void, GetCompletedCampaignsOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(): Promise<GetCompletedCampaignsOutput> {
        const campaigns = await this.campaignRepo.findCompletedCampaigns();
        return campaigns.map(CampaignOutputMapper.toOutput);
    }
}

type GetCompletedCampaignsOutput = CampaignOutput[];
