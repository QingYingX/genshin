import fs from 'node:fs'
import Base from '../../../plugins/miao-plugin/models/Base.js'
import Character from '../../../plugins/miao-plugin/models/Character.js'
import Artifact from '../../../plugins/miao-plugin/models/Artifact.js'
import ArtifactSet from '../../../plugins/miao-plugin/models/ArtifactSet.js'
import Abyss from '../../../plugins/miao-plugin/models/Abyss.js'
import RoleCombat from '../../../plugins/miao-plugin/models/RoleCombat.js'
import HardChallenge from '../../../plugins/miao-plugin/models/HardChallenge.js'
import Player from '../../../plugins/miao-plugin/models/Player.js'
import Avatar from '../../../plugins/miao-plugin/models/Avatar.js'
import ProfileDmg from '../../../plugins/miao-plugin/models/ProfileDmg.js'
import ProfileRank from '../../../plugins/miao-plugin/models/ProfileRank.js'
import Material from '../../../plugins/miao-plugin/models/Material.js'
import Weapon from '../../../plugins/miao-plugin/models/Weapon.js'
import User from '../../../plugins/miao-plugin/models/User.js'
import MysApi from '../../../plugins/miao-plugin/models/MysApi.js'
import Button from '../../../plugins/miao-plugin/models/Button.js'
import { miaoPath } from '../../../plugins/miao-plugin/tools/path.js'
import Artis from '../../../plugins/miao-plugin/models/artis/Artis.js'

// 修复 Avatar.setAvatarBase 方法，防止 _mysArtis 未初始化导致的错误
if (Avatar && Avatar.prototype) {
  const originalSetAvatarBase = Avatar.prototype.setAvatarBase
  Avatar.prototype.setAvatarBase = function(ds, source = "") {
    // 如果 _mysArtis 未初始化，则初始化它
    if (!this._mysArtis) {
      const game = this.game || ds?.game || "gs"
      this._mysArtis = new Artis(game)
      // 如果 game 也未设置，则设置它
      if (!this.game) {
        this.game = game
      }
    }
    // 如果 _artis 也未初始化，则初始化它
    if (!this._artis) {
      const game = this.game || ds?.game || "gs"
      this._artis = new Artis(game, true)
    }
    // 调用原始方法
    return originalSetAvatarBase.call(this, ds, source)
  }
}

for (let game of ['gs', 'sr']) {
  for (let type of ['artifact', 'character', 'material', 'weapon']) {
    let file = `${miaoPath}/resources/meta-${game}/${type}/index.js`
    if (fs.existsSync(file)) {
      try {
        await import(`file://${file}`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
export {
  Base,
  Abyss,
  RoleCombat,
  HardChallenge,
  Button,
  Character,
  Artifact,
  ArtifactSet,
  Avatar,
  ProfileDmg,
  ProfileRank,
  Material,
  Weapon,
  User,
  MysApi,
  Player
}
