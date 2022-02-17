/* Copyright (C) 2022 TaiAurori (Gabriel Sylvain) - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license.
 * Basically, you can change and redistribute this code
 * but this copyright notice must remain unmodified.
 */

const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");
module.exports = class NoInstaJoin extends Plugin {
    startPlugin() {
        this.initInject();
    }
    async initInject() {
      const t = await getModule(m => m && m.default && m.default.transitionToInvite)
      const g = await getModule(m => m && m.findCodedLink)
      const a = await getModule(["getOnClick"])
      inject("no-insta-join", a, "getOnClick", (e) => {
          let coded = g.findCodedLink(e[0])
          if (coded?.type == "INVITE") {
              return async (e2) => {
                  if (e2) e2.preventDefault()
                  t.default.openNativeAppModal(coded.code, "INVITE_BROWSER")
              }
          }
      })
    }

    pluginWillUnload() {
        uninject("no-insta-join");
    };
};
