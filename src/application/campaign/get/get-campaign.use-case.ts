import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";
import { CampaignOutput, CampaignOutputMapper } from "../common/campaign-output.js";

export class GetCampaignUseCase implements IUseCase<GetCampaignInput, GetCampaignOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(input: GetCampaignInput): Promise<GetCampaignOutput> {
        const uuid = new Uuid(input.id);
        const campaign = await this.campaignRepo.findById(uuid);
        
        if (!campaign) {
            throw new Error("Campaign not exists");
        }

        return CampaignOutputMapper.toOutput(campaign);
    }
}

interface GetCampaignInput {
    id: string;
}

type GetCampaignOutput = CampaignOutput;
