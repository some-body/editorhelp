"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLostieCreateDto = exports.createLostieDto = void 0;
function createLostieDto(lostie, pet) {
    return {
        id: lostie.id,
        description: lostie.description,
        contactsDescription: lostie.contactsDescription,
        createdTimestampMs: lostie.createdTimestampMs,
        lastUpdateTimestampMs: lostie.lastUpdateTimestampMs,
        petName: pet.name,
        petGender: pet.gender,
        petType: pet.type,
        petBirthTimestampMs: pet.birthTimestampMs,
        petBreed: pet.breed,
        petColorDescription: pet.colorDescription,
        petDescription: pet.description,
    };
}
exports.createLostieDto = createLostieDto;
function parseLostieCreateDto(json) {
    return {
        description: json['description'],
        contactsDescription: json['contactsDescription'],
        petName: json['petName'],
        petType: json['petType'],
        petGender: json['petGender'],
        petColorDescription: json['petColorDescription'],
        petBreed: json['petBreed'],
        petBirthTimestampMs: json['petBirthTimestampMs'],
        petDescription: json['petDescription'],
    };
}
exports.parseLostieCreateDto = parseLostieCreateDto;
