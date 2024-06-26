import {ChainForkConfig} from "@lodestar/config";
import {DatabaseController, Repository} from "@lodestar/db";
import {ssz} from "@lodestar/types";
import {ContainerType, VectorCompositeType} from "@chainsafe/ssz";
import {SyncCommitteeWitness} from "../../chain/lightClient/types.js";
import {Bucket, getBucketNameByValue} from "../buckets.js";

/**
 * Historical sync committees witness by block root
 *
 * Used to prepare lightclient updates and initial snapshots
 */
export class SyncCommitteeWitnessRepository extends Repository<Uint8Array, SyncCommitteeWitness> {
  constructor(config: ChainForkConfig, db: DatabaseController<Uint8Array, Uint8Array>) {
    const bucket = Bucket.lightClient_syncCommitteeWitness;
    const type = new ContainerType({
      witness: new VectorCompositeType(ssz.Root, 4),
      currentSyncCommitteeRoot: ssz.Root,
      nextSyncCommitteeRoot: ssz.Root,
    });

    super(config, db, bucket, type, getBucketNameByValue(bucket));
  }
}
