import { redirectUrl } from "./URL/redirect.js";
import { shrinkUrl } from "./URL/shrink.js";
import { getViews } from "./URL/views.js";

const urlController = {
    shrink:shrinkUrl,
    redirect:redirectUrl,
    views:getViews,
}

export default urlController;