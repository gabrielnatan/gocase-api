import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetArchivedCampaignsUseCase implements IUseCase<void, GetArchivedCampaignsOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(): Promise<GetArchivedCampaignsOutput> {
        const campaigns = await this.campaignRepo.findArchivedCampaigns();
        return campaigns.map(CampaignOutputMapper.toOutput);
    }
}

type GetArchivedCampaignsOutput = CampaignOutput[];
