import { EntityRepository, Repository } from 'typeorm';
import { Images } from '../entities/Images';
import aws from 'aws-sdk';

@EntityRepository(Images)
class ImagesRepository extends Repository<Images> {
  // method to find images in Amazon's AWS bucket
  async findImageInBucket(key: string) {
    const s3 = new aws.S3();

    s3.getObject({
      Bucket: process.env.AWS_BUCKET,
      Key: key
    })
      .promise()
      .then(() => {
        console.log('The image was found in AWS Bucket');
      })
      .catch(() => {
        console.log('Image not found in AWS Bucket');
      });
  }

  // method to delete images from Amazon's AWS bucket
  async deleteImageFromBucket(key: string) {
    const s3 = new aws.S3();

    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: key
    })
      .promise()
      .then(() => {
        console.log('Image successfully deleted from AWS');
      })
      .catch(() => {
        console.log('Image could not be deleted from AWS');
      });
  }
}

export { ImagesRepository };
