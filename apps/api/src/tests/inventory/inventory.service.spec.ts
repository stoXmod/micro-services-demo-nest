import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../../features/inventory/inventory.service';
import { InventoryRepository } from '../../features/inventory/inventory.repository';
import { ConsumerService } from '../../kafka/consumer.service';
import { ProductDto } from '../../features/inventory/dtos/product.dto';

describe('InventoryService', () => {
  let service: InventoryService;
  let consumerServiceMock: jest.Mocked<ConsumerService>;
  let repositoryMock: jest.Mocked<InventoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: ConsumerService,
          useValue: {
            consume: jest.fn(),
          },
        },
        {
          provide: InventoryRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    consumerServiceMock = module.get(ConsumerService);
    repositoryMock = module.get(InventoryRepository);
  });

  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('subscribeToOrderEvents', () => {
    it('should subscribe to order events', () => {
      // Mock the consume method and verify that it is called with the correct arguments
      const consumeMock = consumerServiceMock.consume as jest.Mock;
      consumeMock.mockImplementationOnce(() => {});

      // Call the method to be tested
      service['subscribeToOrderEvents']();

      // Verify that the consume method was called
      expect(consumeMock).toHaveBeenCalledWith({
        topic: { topic: 'order_place' },
        config: { groupId: 'order-consumer' },
        onMessage: expect.any(Function),
      });
    });
  });

  describe('handleOrderEvent', () => {
    it('should update inventory based on order event', async () => {
      const serviceAny = service as any;
      const updateInventoryMock = jest.spyOn(serviceAny, 'updateInventory');

      const orderEvent = {
        orderId: '1',
        userId: 'user1',
        products: ['product1', 'product2'],
      };

      await serviceAny['handleOrderEvent'](orderEvent);
      expect(updateInventoryMock).toHaveBeenCalledWith(orderEvent.products);
    });
  });

  describe('updateInventory', () => {
    it('should update the inventory for each product', async () => {
      const findOneAndUpdateMock = repositoryMock.findOneAndUpdate as jest.Mock;
      findOneAndUpdateMock.mockResolvedValueOnce({});

      const products = ['product1', 'product2'];

      // Call the method to be tested
      await service['updateInventory'](products);

      // Verify that the findOneAndUpdate method was called for each product
      for (const product of products) {
        expect(findOneAndUpdateMock).toHaveBeenCalledWith(
          { productId: product },
          { $inc: { quantity: -1 } },
          { new: true, upsert: true },
        );
      }
    });
  });

  describe('addProduct', () => {
    it('should add a product to the inventory', async () => {
      // Mock the create method and verify that it is called with the correct arguments
      const createMock = repositoryMock.create as jest.Mock;
      createMock.mockResolvedValueOnce({} as ProductDto);

      const productData: ProductDto = {
        productId: 'product1',
        name: 'Product 1',
        quantity: 10,
      };

      // Call the method to be tested
      await service.addProduct(productData);

      // Verify that the create method was called with the correct arguments
      expect(createMock).toHaveBeenCalledWith(productData);
    });
  });

  describe('getAllProducts', () => {
    it('should get all products from the inventory', async () => {
      // Mock the find method and specify the return value
      const findMock = repositoryMock.find as jest.Mock;
      const mockProducts: ProductDto[] = [
        { productId: 'product1', name: 'Product 1', quantity: 10 },
        { productId: 'product2', name: 'Product 2', quantity: 15 },
      ];
      findMock.mockResolvedValueOnce(mockProducts);

      // Call the method to be tested
      const result = await service.getAllProducts();

      // Verify that the find method was called
      expect(findMock).toHaveBeenCalled();

      // Verify that the result matches the expected products
      expect(result).toEqual(mockProducts);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product from the inventory', async () => {
      // Mock the deleteOne method and verify that it is called with the correct arguments
      const deleteOneMock = repositoryMock.deleteOne as jest.Mock;
      deleteOneMock.mockResolvedValueOnce({} as any);

      const productId = 'product1';

      // Call the method to be tested
      await service.deleteProduct(productId);

      // Verify that the deleteOne method was called with the correct arguments
      expect(deleteOneMock).toHaveBeenCalledWith({ productId });
    });
  });

  describe('updateProduct', () => {
    it('should update a product in the inventory', async () => {
      // Mock the findOneAndUpdate method and verify that it is called with the correct arguments
      const findOneAndUpdateMock = repositoryMock.findOneAndUpdate as jest.Mock;
      findOneAndUpdateMock.mockResolvedValueOnce({} as any);

      const productData: Partial<ProductDto> = {
        productId: 'product1',
        name: 'Updated Product',
        quantity: 20,
      };

      // Call the method to be tested
      await service.updateProduct(productData);

      // Verify that the findOneAndUpdate method was called with the correct arguments
      expect(findOneAndUpdateMock).toHaveBeenCalledWith(
        { productId: productData.productId },
        { $set: productData },
        { new: true, upsert: true },
      );
    });
  });
});
