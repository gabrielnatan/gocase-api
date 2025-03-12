import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ICampaignRepository } from "../../../domain/campaign/repository/campaign.repository.interface.js";

export class DeleteCampaignUseCase implements IUseCase<DeleteCampaignUseCaseInput, DeleteCampaignUseCaseOutput> {
    constructor(private readonly campaignRepo: ICampaignRepository) {}

    async execute(input: DeleteCampaignUseCaseInput): Promise<DeleteCampaignUseCaseOutput> {
        const uuid = new Uuid(input.id);
        await this.campaignRepo.delete(uuid);
        return { success: true };
    }
}

interface DeleteCampaignUseCaseInput {
    id: string;
}

type DeleteCampaignUseCaseOutput = { success: boolean };
