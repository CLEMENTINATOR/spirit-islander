import { ADVERSARIES } from "@data/adversaries";
import { MAPS } from "@data/maps";
import { SCENARIOS } from "@data/scenarios";
import { SPIRITS } from "@data/spirits";
import type { AdversaryLevelId, AdversaryName } from "@models/game/adversaries";
import type { ExpansionName, IExpansionOption } from "@models/game/expansions";
import type { MapName } from "@models/game/maps";
import type { ScenarioName } from "@models/game/scenarios";
import type { SpiritName } from "@models/game/spirits";
import { getItems } from "./get-items";

export function createSpiritsModel(expansions: ExpansionName[] = []): SpiritName[] {
	return createModel(SPIRITS, expansions);
}

export function createMapsModel(expansions: ExpansionName[] = []): MapName[] {
	return createModel(MAPS, expansions);
}

export function createScenariosModel(expansions: ExpansionName[] = []): ScenarioName[] {
	return createModel(SCENARIOS, expansions);
}

export function createAdversariesModel(expansions: ExpansionName[] = []): (AdversaryName | AdversaryLevelId)[] {
	return getItems(ADVERSARIES, expansions).reduce((adversaries, adversary) => {
		adversaries.push(adversary.name);
		adversary.levels.forEach(level => {
			adversaries.push(level.id);
		});
		return adversaries;
	}, [] as (AdversaryName | AdversaryLevelId)[])
}

interface INameOption<T> {
	name: T;
}

interface IOption<TName> extends INameOption<TName>, IExpansionOption { }

function createModel<TName>(options: IOption<TName>[], expansions: ExpansionName[]): TName[] {
	return getItems(options, expansions).map(option => option.name);
}
