import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all posts", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const exisitingPrompt = await Prompt.findById(params.id);

    if (!exisitingPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tag = tag;

    await exisitingPrompt.save();

    return new Response(JSON.stringify(exisitingPrompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    //remove returns the deleted doc and delete doesnst
    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response("Prompt deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
