import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetCanceledCampaignsUseCase implements IUseCase<void, GetCanceledCampaignsOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(): Promise<GetCanceledCampaignsOutput> {
        const campaigns = await this.campaignRepo.findCanceledCampaigns();
        return campaigns.map(CampaignOutputMapper.toOutput);
    }
}

type GetCanceledCampaignsOutput = CampaignOutput[];
