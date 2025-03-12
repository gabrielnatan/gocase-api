import express, { Request, Response } from "express";
import { CampaignModel } from "../../../campaign/db/mongo/model/campaign.model.js";
import { ListCampaignUseCase } from "../../../../application/campaign/list/list-campaign.use-case.js";
import { CreateCampaignUseCase } from "../../../../application/campaign/create/create-campaign.use-case.js";
import { UpdateCampaignUseCase } from "../../../../application/campaign/update/update-campaign.use-case.js";
import { GetCampaignUseCase } from "../../../../application/campaign/get/get-campaign.use-case.js";
import { DeleteCampaignUseCase } from "../../../../application/campaign/delete/delete-campaign.use-case.js";
import { CampaignRepository } from "../../../campaign/db/mongo/repository/campaign.repository.js";
import { GetActiveCampaignsUseCase } from "../../../../application/campaign/get/get-active-campaigns.use-case.js";
import { GetCompletedCampaignsUseCase } from "../../../../application/campaign/get/get-completed-campaigns.use-case.js";
import { GetPendingCampaignsUseCase } from "../../../../application/campaign/get/get-pending-campaigns.use-case.js";
import { GetCanceledCampaignsUseCase } from "../../../../application/campaign/get/get-canceled-campaigns.use-case.js";
import { GetArchivedCampaignsUseCase } from "../../../../application/campaign/get/get-archived-campaigns.use-case.js";

const campaignRouter = express.Router();

const campaignRepository = new CampaignRepository(CampaignModel);
const getCampaignUseCase = new GetCampaignUseCase(campaignRepository);
const listCampaignUseCase = new ListCampaignUseCase(campaignRepository);
const createCampaignUseCase = new CreateCampaignUseCase(campaignRepository);
const updateCampaignUseCase = new UpdateCampaignUseCase(campaignRepository);
const deleteCampaignUseCase = new DeleteCampaignUseCase(campaignRepository);
const getActiveCampaignsUseCase = new GetActiveCampaignsUseCase(campaignRepository);
const getCompletedCampaignsUseCase = new GetCompletedCampaignsUseCase(campaignRepository);
const getPendingCampaignsUseCase = new GetPendingCampaignsUseCase(campaignRepository);
const getCanceledCampaignsUseCase = new GetCanceledCampaignsUseCase(campaignRepository);
const getArchivedCampaignsUseCase = new GetArchivedCampaignsUseCase(campaignRepository);

const handleError = (res: Response, error: unknown) => {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred." });
    }
};

campaignRouter.get('/', async (req: Request, res: Response) => {
    try {
        const campaigns = await listCampaignUseCase.execute({ user_id: req.user.id as string });
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const campaign = await getCampaignUseCase.execute({ id });
        res.json({ message: campaign });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.post('/', async (req: Request, res: Response) => {
    try {
        const campaignDTO = {
            ...req.body,
            user_id: req.user.id
        };

        const campaign = await createCampaignUseCase.execute(campaignDTO);
        res.status(201).json({ message: campaign });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const campaignDTO = { id, ...req.body };
        const campaign = await updateCampaignUseCase.execute(campaignDTO);
        res.json({ message: campaign });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const campaign = await deleteCampaignUseCase.execute({ id });
        res.json({ message: campaign });
    } catch (error) {
        handleError(res, error);
    }
});


campaignRouter.get('/status/active', async (req: Request, res: Response) => {
    try {
        const campaigns = await getActiveCampaignsUseCase.execute();
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.get('/status/completed', async (req: Request, res: Response) => {
    try {
        const campaigns = await getCompletedCampaignsUseCase.execute();
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.get('/status/pending', async (req: Request, res: Response) => {
    try {
        const campaigns = await getPendingCampaignsUseCase.execute();
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.get('/status/canceled', async (req: Request, res: Response) => {
    try {
        const campaigns = await getCanceledCampaignsUseCase.execute();
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

campaignRouter.get('/status/archived', async (req: Request, res: Response) => {
    try {
        const campaigns = await getArchivedCampaignsUseCase.execute();
        res.json({ message: campaigns });
    } catch (error) {
        handleError(res, error);
    }
});

export { campaignRouter };
