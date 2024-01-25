import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  protected constructor(protected readonly model: Model<TDocument>) {}

  async create<T>(document: T): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      update,
      options,
    );

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }
}
