!function(t, e) {
    "undefined" != typeof module && module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : this[t] = e()
} ("clipBoard",
function() {
    "use strict";
    function t(t, e) {
        this.options = e || {},
        this.tar = t[0] || t,
        this.options.copy && this.copyd(),
        this.options.cut && this.cut(),
        this.options.paste && this.paste()
    }
    return t.prototype.copyd = function(t) {
        if (this.options.beforeCopy && this.options.beforeCopy(), t = t || this.tar.value || this.tar.innerText, this.options.copy && (t = this.options.copy()), document.execCommand) {
            var e = document.createElement("SPAN");
            if (e.textContent = t, document.body.appendChild(e), document.selection) {
                var o = document.body.createTextRange();
                o.moveToElementText(e),
                o.select()
            } else if (window.getSelection) {
                var o = document.createRange();
                o.selectNode(e),
                window.getSelection().removeAllRanges(),
                window.getSelection().addRange(o)
            }
            document.execCommand("copy"),
            e.remove ? e.remove() : e.removeNode(!0)
        }
        window.clipboardData && window.clipboardData.setData("text", t),
        this.options.afterCopy && this.options.afterCopy()
    },
    t.prototype.cut = function() {
        if ("text" === this.tar.type || "textarea" === this.tar.type) {
            if (this.options.beforeCut && this.options.beforeCut(), document.execCommand) {
                var t = this.tar;
                if (document.selection) {
                    var e = document.body.createTextRange();
                    e.moveToElementText(t),
                    e.select()
                } else window.getSelection && t.select();
                document.execCommand("cut")
            }
            window.clipboardData && (window.clipboardData.setData("text", this.tar.value), this.tar.value = ""),
            this.options.afterCut && this.options.afterCut()
        }
    },
    t.prototype.paste = function() {
        if ("text" === this.tar.type || "textarea" === this.tar.type) {
            if (this.options.beforePaste && this.options.beforePaste(), document.execCommand) {
                var t = this.tar;
                if (t.setSelectionRange) t.focus(),
                t.setSelectionRange(t.value.length, t.value.length);
                else if (t.createTextRange) {
                    var e = t.createTextRange();
                    e.collapse(!0),
                    e.moveEnd("character", t.value.length),
                    e.moveStart("character", t.value.length),
                    e.select()
                }
                document.execCommand("paste")
            } ! document.execCommand && window.clipboardData && (this.tar.value += window.clipboardData.getData("text")),
            this.options.afterPaste && this.options.afterPaste()
        }
    },
    t
});