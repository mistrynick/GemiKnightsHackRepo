import { storage } from "../../engine/utils/storage";
import { engine } from "../getEngine";

// Keys for saved items in storage
const KEY_VOLUME_MASTER = "volume-master";
const KEY_VOLUME_BGM = "volume-bgm";
const KEY_VOLUME_SFX = "volume-sfx";

/**
 * Persistent user settings of volumes.
 */
class UserSettings {
  public init() {
    engine().audio.setMasterVolume(this.getMasterVolume());
    engine().audio.bgm.setVolume(this.getBgmVolume());
    engine().audio.sfx.setVolume(this.getSfxVolume());
  }

  /** Get overall sound volume */
  public getMasterVolume() {
    return storage.getNumber(KEY_VOLUME_MASTER) ?? 0.5;
  }

  /** Set overall sound volume */
  public setMasterVolume(value: number) {
    engine().audio.setMasterVolume(value);
    storage.setNumber(KEY_VOLUME_MASTER, value);
  }
  public setCups(value: number) {
    storage.setNumber("cups", value);
  }
  public getCups() {
    return storage.getNumber("cups") ?? 1;
  }
  public getPrice() {
    return storage.getNumber("price") ?? 1;
  }

  public getBoba() {
    return storage.getNumber("boba") ?? 1;
  }
  public setBoba(value:number) {
    return storage.setNumber("boba", value);
  }
  public setPrice(value:number) {
    return storage.setNumber("price", value);
  }

  /** Get background music volume */
  public getBgmVolume() {
    return storage.getNumber(KEY_VOLUME_BGM) ?? 1;
  }

  /** Set background music volume */
  public setBgmVolume(value: number) {
    engine().audio.bgm.setVolume(value);
    storage.setNumber(KEY_VOLUME_BGM, value);
  }

  /** Get sound effects volume */
  public getSfxVolume() {
    return storage.getNumber(KEY_VOLUME_SFX) ?? 1;
  }

  /** Set sound effects volume */
  public setSfxVolume(value: number) {
    engine().audio.sfx.setVolume(value);
    storage.setNumber(KEY_VOLUME_SFX, value);
  }

  public setMilk(value: number) {
    storage.setNumber("milk", value);
  }
  public getMilk() {
    return storage.getNumber("milk") ?? 1;
  }

  public setTeas(value: number) {
    storage.setNumber("teas", value);
  }
  public getTeas() {
    return storage.getNumber("teas") ?? 1;
  }


  public setThaiTea(value: number) {
    storage.setNumber("thaitea", value);
  }
  public getThaiTea() {
    return storage.getNumber("thaitea") ?? 1;
  }

  public setStrawberry(value: number) {
    storage.setNumber("strawberry", value);
  }
  public getStrawberry() {
    return storage.getNumber("strawberry") ?? 1;
  }

  public setBrownsugar(value: number) {
    storage.setNumber("brownsugar", value);
  }
  public getBrownSugar() {
    return storage.getNumber("brownsugar") ?? 1;
  }

  public setTaro(value: number) {
    storage.setNumber("taro", value);
  }
  public getTaro() {
    return storage.getNumber("taro") ?? 1;
  }

  public setFinished(value: boolean) {
    storage.setBool("finished", value);
  }
  public getStatus() {
    return storage.getBool("finished");
  }


}

/** SHared user settings instance */
export const userSettings = new UserSettings();
