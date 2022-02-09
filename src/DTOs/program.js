export class ProgramDTO {
	constructor({
		id,
		author_info,
		title,
		version,
		url,
		short_description,
		license,
		thumbnail,
		rating,
		total_downloads,
		compatible}
	) {
		this.id = id;
		this.author_info = author_info;
		this.title = title;
		this.version = version;
		this.url = url;
		this.short_description = short_description;
		this.license = license;
		this.thumbnail = thumbnail;
		this.rating = rating;
		this.total_downloads = total_downloads;
		this.compatible = compatible;
	}

	map(field, value) {
		this[field] = value;
	}
}
