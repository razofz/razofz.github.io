import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array
	const lowercaseItems = array.map((str) => str.toLowerCase())
	const distinctItems = new Set(lowercaseItems)
	return Array.from(distinctItems)
}

const post = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(50).max(160),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string()
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			ogImage: z.string().optional()
		})
})

const infoCollection = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		about_me: z.string(),
		fullname: z.string(),
		languages: z.array(z.string()),
		programming_languages: z.array(z.string()),
		markup_languages: z.array(z.string()),
		data_tools: z.array(z.string()),
		frameworks: z.array(z.string()),
		misc_skills: z.array(z.string()),
		linkedin_username: z.string(),
		github_username: z.string(),
		orcid: z.string(),
	})
})

export const collections = { 
	"post": post, 
	"info_dicts": infoCollection
}
