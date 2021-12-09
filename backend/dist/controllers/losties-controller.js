"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostiesController = void 0;
const lostie_entity_1 = require("../db/entities/lostie-entity");
const pet_entity_1 = require("../db/entities/pet-entity");
const errors_1 = require("../errors");
const api_controller_1 = require("./api-controller");
const lostie_dto_1 = require("./dto/lostie-dto");
class LostiesController extends api_controller_1.ApiController {
    constructor(authServiceFactory, petsRepository, lostiesRepository) {
        super('/losties');
        this.authServiceFactory = authServiceFactory;
        this.petsRepository = petsRepository;
        this.lostiesRepository = lostiesRepository;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw new errors_1.HttpException(418, 'Not supported.');
            }
            const lostie = yield this.lostiesRepository.getLostieById(id);
            if (!lostie) {
                throw new errors_1.HttpException(404, `No lostie with id ${id}.`);
            }
            const pet = yield this.petsRepository.getPetById(lostie.petId);
            if (!pet) {
                throw new errors_1.HttpException(404, `No pet for lostie with id ${id}. Pet id: ${lostie.petId}.`);
            }
            res.statusCode = 200;
            res.send({ lostie: (0, lostie_dto_1.createLostieDto)(lostie, pet) });
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lostieDto = (0, lostie_dto_1.parseLostieCreateDto)(req.body);
            if (!lostieDto) {
                throw new errors_1.HttpException(400, 'Invalid data.');
            }
            const authService = this.authServiceFactory(req);
            const user = yield authService.requireCurrentUser();
            const petToCreate = this.parsePetEntityFromLostieDto(lostieDto, user.id);
            const createdPet = yield this.petsRepository.createPet(petToCreate);
            if (!createdPet) {
                throw new errors_1.HttpException(500, 'Cannot create pet.');
            }
            const lostieToCreate = this.parseLostieEntityFromLostieDto(lostieDto, createdPet, user);
            const createdLostie = yield this.lostiesRepository.createLostie(lostieToCreate);
            if (!createdLostie) {
                throw new errors_1.HttpException(500, 'Cannot create lostie.');
            }
            res.statusCode = 201;
            res.send({ lostie: (0, lostie_dto_1.createLostieDto)(createdLostie, createdPet) });
        });
    }
    parsePetEntityFromLostieDto(lostieDto, ownerId) {
        const { petName, petBreed, petColorDescription, petDescription, petType, petGender, petBirthTimestampMs, } = lostieDto;
        const stringFields = [
            petName,
            petBreed,
            petColorDescription,
            petDescription,
        ];
        checkIsString(stringFields);
        if (petType !== pet_entity_1.PetType.Cat && petType !== pet_entity_1.PetType.Dog) {
            throw new errors_1.HttpException(400, 'Cannot parse pet type.');
        }
        if (petGender !== pet_entity_1.PetGender.Male && petGender !== pet_entity_1.PetGender.Female && petGender !== pet_entity_1.PetGender.Unknown) {
            throw new errors_1.HttpException(400, 'Cannot parse pet gender.');
        }
        let birthTimestampMsOrZero = petBirthTimestampMs;
        if (typeof (petBirthTimestampMs) !== 'number') {
            birthTimestampMsOrZero = 0;
            console.warn('Replacing petBirthTimestampMs with zero.');
        }
        return {
            ownerId: ownerId,
            name: petName,
            type: petType,
            gender: petGender,
            birthTimestampMs: birthTimestampMsOrZero,
            breed: petBreed,
            colorDescription: petColorDescription,
            description: petDescription,
            photoIdsJsonArray: "[]", // TODO: implement.
        };
    }
    parseLostieEntityFromLostieDto(lostieDto, pet, user) {
        const { contactsDescription, description } = lostieDto;
        checkIsString([contactsDescription, description]);
        return {
            contactsDescription: lostieDto.contactsDescription,
            description: lostieDto.description,
            petId: pet.id,
            status: lostie_entity_1.LostieStatus.Searching,
            creatorId: user.id,
        };
    }
}
exports.LostiesController = LostiesController;
function checkIsString(values) {
    if (values.some((value) => typeof (value) !== 'string')) {
        throw new errors_1.HttpException(400, 'Invalid fields.');
    }
}
