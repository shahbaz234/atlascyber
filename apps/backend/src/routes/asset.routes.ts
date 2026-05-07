import { Router } from 'express';
import { listAssets, getAsset, createAsset, updateAsset, deleteAsset, getAssetStats } from '../controllers/asset.controller';
import { authenticate } from '../middleware/auth.middleware';

export const assetRouter = Router();

assetRouter.use(authenticate);

assetRouter.get('/', listAssets);
assetRouter.post('/', createAsset);
assetRouter.get('/stats', getAssetStats);
assetRouter.get('/:id', getAsset);
assetRouter.put('/:id', updateAsset);
assetRouter.delete('/:id', deleteAsset);
