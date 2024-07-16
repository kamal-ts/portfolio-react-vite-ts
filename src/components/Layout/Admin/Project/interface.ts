
export interface ProjectType {
    title: string;
    tag: string;
    category: string;
    description?: string;
    image: [{
        secure_url: string,
        public_id: string
    }];
    createdAt: string;
    id: string;
    link_git?: true,
    link_web?: true,
    updatedAt?: true
}

export interface PagingPage {
    current_page: number,
    total_item: number,
    total_page: number,    
}
